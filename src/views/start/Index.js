import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Start from './Start';
import Result from '../result/Result';

export default function Index() {
    const [show,setshow] = useState(true);
  return (
    <>
    {
        show ? (
            <Start changeShow = {setshow}></Start>
        ):(
            <Result changeShow = {setshow}></Result>
        )
    }
    </>
  )
}

const styles = StyleSheet.create({})

