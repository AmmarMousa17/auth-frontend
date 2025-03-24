import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage
} from '@chakra-ui/react'

function InputField({ label, register, error, type = 'text' }: any) {
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel>{label}</FormLabel>
            <Input type={type} {...register} />
            <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
    )
}

export default InputField
