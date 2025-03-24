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
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const toast = useToast()
    const navigate = useNavigate()

    const onSubmit = async (data: any) => {
        try {
            await api.post('/auth/signup', data)
            toast({ title: 'Signup successful', status: 'success' })
            navigate('/')
        } catch (err: any) {
            toast({
                title: 'Signup failed',
                description: err.response?.data?.message || 'An error occurred',
                status: 'error'
            })
        }
    }

    return (
        <Box p={6} maxW="md" mx="auto">
            <Heading mb={6}>Sign Up</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    <InputField label="Name" register={register('name')} error={errors.name} />
                    <InputField label="Email" register={register('email')} error={errors.email} />
                    <InputField label="Password" register={register('password')} error={errors.password} type="password" />
                    <Button type="submit" colorScheme="teal" width="full">Sign Up</Button>
                    <Text>
                        Already have an account? <Link href="/">Sign In</Link>
                    </Text>
                </VStack>
            </form>
        </Box>
    )
}

export default SignUp
