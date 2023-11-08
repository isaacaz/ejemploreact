import { useEffect, useState } from "react"
import userService from '../services/userService'
import { IUser } from "../types"

export const useUser = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const [data, setData] = useState<IUser[]>([])

    const getData = async () => {
        setIsLoading(true)
        try {
            const data = await userService.getAllData()
            setData(data)
        } catch (e) {
            setIsError(true)
        }
        finally {
            setIsLoading(false)
        }
    }

    const getUser = async (id: string) => {
        setIsLoading(true)
        try {
            const data = await userService.getData(id + "")
            return data
        } catch (e) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const createUser = async (user: IUser) => {
        try {
            await userService.insertData(user)
        } catch (e) {
            setIsError(true)
        }
    }

    const updateUser = async (user: IUser) => {
        try {
            await userService.updateData(user)
            getData()
        } catch (e) {
            setIsError(true)
        }
    }

    const deleteUser = async (user: IUser) => {
        try {
            await userService.deleteData(user.id + "")
            getData()
        } catch (e) {
            setIsError(true)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return {
        isLoading,
        isError,
        data,
        getUser,
        createUser,
        deleteUser,
        updateUser
    }
}