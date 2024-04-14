"use client"
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import PawToken from '@/abi/PawToken.json'
import Faucet from '@/abi/TokenFaucet.json'
import Game from '@/abi/GameSystem.json'
import { getRandomInteger } from '@/lib/num'


export const PlayerInfo = () => {
    const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS! as `0x${string}`
    const faucetAddress = process.env.NEXT_PUBLIC_FAUCET_ADDRESS! as `0x${string}`
    const worldAddress = process.env.NEXT_PUBLIC_WORLD_ADDRESS! as `0x${string}`

    const account = useAccount()
    const {address} = account
    console.log("address", address)

    const _tokenBalance = useReadContract({
        abi: PawToken.abi,
        address: tokenAddress,
        functionName: 'balanceOf',
        args: [address]
      })
    const tokenBalance = !!_tokenBalance?.data ? _tokenBalance?.data?.toString() : 'Loading...'
      console.log("tokenBalance", tokenBalance)

      

    const { writeContract } = useWriteContract()
    const onRequestFaucet = async () => {
        writeContract({          
            abi: Faucet.abi,
            address: faucetAddress,
            functionName: 'requestTokens',
            args: [
              '0x',
              0,
            ],
        })
    }

    const onApproveGame = async () => {
        console.log("onApproveGame")
        writeContract({          
            abi: PawToken.abi,
            address: tokenAddress,
            functionName: 'approve',
            args: [
              worldAddress, 100000000000000000000000000
            ],
        })
    }

    const onStartGame = async () => {
        console.log("onStartGame")
        const result = await writeContract({          
            abi: Game.abi,
            address: worldAddress,
            functionName: 'startGame',
            args: [
              1
            ],
        })
        console.log("result", result)
    }


    const currentRoundId = useReadContract({
        abi: Game.abi,
        address: worldAddress,
        functionName: 'currentRound',
      })
    const roundId = !!currentRoundId?.data

    const playerState = useReadContract({
        abi: Game.abi,
        address: worldAddress,
        functionName: 'player',
        args: [address, roundId],
    })
    console.log("playerState", playerState.data)
    // const startTime = !!roundState?.data ? roundState?.data?.roundInfo?.startTime : 'Loading...'

    const onSubmitProof = async () => {
        console.log("onSubmitProof")
        const score = getRandomInteger(10, 100)
        const result = await writeContract({          
            abi: Game.abi,
            address: worldAddress,
            functionName: 'submitProof',
            args: [
              [], 
              [], 
              [], 
              [[(playerState.data! as any).currentSeed, 0, 0, 0, score]]
            ],
        })
        console.log("result", result)
    }


    return (
        <div className='space-y-6'>
            <p className="text-lg">Player info</p>
            <div><button onClick={onRequestFaucet} className="bg-slate-400 rounded-lg p-2">Request faucet</button></div>
            <div><button onClick={onApproveGame} className="bg-slate-400 rounded-lg p-2">Approve game</button></div>
            <div><button onClick={onStartGame} className="bg-slate-400 rounded-lg p-2">Start game</button></div>
            <div><button onClick={onSubmitProof} className="bg-slate-400 rounded-lg p-2">Submit proof</button></div>
            <ul className='list-disc list-inside'>
                <li>PAW: {tokenBalance}</li>
                <li>Best score: {(playerState?.data as any)?.bestScore?.toString()}</li>
            </ul>
        </div>
    )
}