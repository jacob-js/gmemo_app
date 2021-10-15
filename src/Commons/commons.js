import { FormControl, Input, WarningOutlineIcon } from 'native-base'
import React from 'react'
import theme from '../Utils/theme'

export function CommonInput({ label, onChangeText, value, error, type, kType, placeholder, rightIcon, leftIcon, required, onBlur }) {
    return (
        <FormControl isRequired={required} style={{ marginBottom: 10 }} isInvalid={error}>
            <FormControl.Label>{label}</FormControl.Label>
            <Input bg='rgba(0, 0, 0, 0.1)' onBlur={onBlur} value={value} defaultValue={value} onChangeText={onChangeText} style={{ paddingLeft: 20 }} 
                type={type} keyboardType={kType} placeholder={placeholder || label} InputRightElement={rightIcon} InputLeftElement={leftIcon}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}> {error} </FormControl.ErrorMessage>
        </FormControl>
    )
}
