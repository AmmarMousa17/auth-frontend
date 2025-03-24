import { useEffect, useState } from 'react'
import {
    Box, Heading, Text, Button, Spinner, useToast
} from '@chakra-ui/react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const toast = useToast()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/auth/profile')
                setUser(res.data.user)
            } catch (err) {
                toast({ title: 'Unauthorized', status: 'error' })
                navigate('/')
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    if (loading) return <Spinner size="xl" mt={10} />

    return (
        <Box p={6} maxW="xl" mx="auto" textAlign="center">
            <Heading mb={4}>Welcome</Heading>
            <Text fontSize="lg">Logged in as: {user?.email}</Text>
            <Button mt={6} colorScheme="red" onClick={logout}>Logout</Button>
        </Box>
    )
}

export default Dashboard
