import {
    Box, Heading, VStack, Button, Text, Link, useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '../components/InputField'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
})

function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const toast = useToast()
    const navigate = useNavigate()

    const onSubmit = async (data: any) => {
        try {
            const res = await api.post('/auth/login', data)
            localStorage.setItem('token', res.data.access_token)
            toast({ title: 'Login successful', status: 'success' })
            navigate('/dashboard')
        } catch (err: any) {
            toast({
                title: 'Login failed',
                description: err.response?.data?.message || 'An error occurred',
                status: 'error'
            })
        }
    }

    return (
        <Box p={6} maxW="md" mx="auto">
            <Heading mb={6}>Sign In</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    <InputField label="Email" register={register('email')} error={errors.email} />
                    <InputField label="Password" register={register('password')} error={errors.password} type="password" />
                    <Button type="submit" colorScheme="teal" width="full">Sign In</Button>
                    <Text>
                        Don’t have an account? <Link href="/signup">Sign Up</Link>
                    </Text>
                </VStack>
            </form>
        </Box>
    )
}

export default SignIn
