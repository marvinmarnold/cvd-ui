"use client"

import { useReadContract } from 'wagmi'
import gameSystem from '@/abi/GameSystem.json'

export const GameInfo = () => {
    const { abi } = gameSystem
    const worldAddress = process.env.NEXT_PUBLIC_WORLD_ADDRESS! as `0x${string}`

    const currentRoundId = useReadContract({
        abi,
        address: worldAddress,
        functionName: 'currentRound',
      })
    const roundId = !!currentRoundId?.data ? currentRoundId?.data?.toString() : 'Loading...'

    const roundState = useReadContract({
        abi,
        address: worldAddress,
        functionName: 'roundInfo',
        args: [currentRoundId?.data],
    })
    const startTime = !!roundState?.data ? (roundState?.data as any)?.roundInfo?.startTime : 'Loading...'
    
    const _stakingAmount = useReadContract({
        abi,
        address: worldAddress,
        functionName: 'stakingAmount',
        args: [],
    })
    const stakingAmount = !!_stakingAmount?.data ? _stakingAmount?.data : 'Loading...'

    const _pawAddress = useReadContract({
        abi,
        address: worldAddress,
        functionName: 'tokenAddress',
        args: [],
    })
    const pawAddress = !!_pawAddress?.data ? _pawAddress?.data : 'Loading...'

    return (
        <div className='space-y-6'>
            <div>
                <p className="text-lg">Game info</p>
                <ul className='list-disc list-inside'>
                    <li>PAW token: {pawAddress?.toString()}</li>
                    <li>Staking amount: {stakingAmount?.toString()}</li>
                </ul>
            </div>

            <div>
                <p className="text-lg">Round info</p>
                <ul className='list-disc list-inside'>
                    <li>ID: {roundId}</li>
                    <li>Start time: {startTime}</li>
                </ul>
            </div>
        </div>
    )
}