'use client'
import { nexthFtAbi } from '@/abis'
import { useSWWriteContracts } from '@/app/hooks/useSWWriteContract'
import useWalletCapabilities from '@/app/hooks/useWalletCapabilities'
import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function SmartWallet() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { capabilities } = useWalletCapabilities({ chainId: 84532 })
  const { id, writeContracts } = useSWWriteContracts()

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between gap-8'>
        <div className='flex-col flex gap-8 justify-between h-full align-center '>
          <h1 className='text-xl'>Smart wallet demo</h1>
          <div className='flex flex-col gap-2 align-self-end'>
            <p className='label-text max-w-60'>
              Click &apos; connect &apos; and select the &apos;Coinbase Wallet&apos; to demo the smart wallet
              capabilities
            </p>
          </div>
          <div className='flex flex-col gap-2 justify-between h-full'>
            <p>status: {account.status}</p>

            {account.isConnected ? (
              <>
                <p>capabilities: {capabilities && JSON.stringify(capabilities)}</p>
                <p>addresses: {JSON.stringify(account.addresses)}</p>
                <p>chainId: {account.chainId}</p>
              </>
            ) : null}
          </div>
          {account.address && (
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl'>Transact</h1>
              <div>
                <button
                  className='btn btn-outline btn-wide'
                  onClick={() =>
                    writeContracts({
                      contracts: [
                        {
                          address: '0x119Ea671030FBf79AB93b436D2E20af6ea469a19',
                          abi: nexthFtAbi,
                          functionName: 'safeMint',
                          args: [account.address],
                        },
                        {
                          address: '0x119Ea671030FBf79AB93b436D2E20af6ea469a19',
                          abi: nexthFtAbi,
                          functionName: 'safeMint',
                          args: [account.address],
                        },
                      ],
                    })
                  }>
                  Mint
                </button>
                {id && (
                  <div className='max-w-full'>
                    <p className='w-full whitespace-pre-wrap'> ID: {id}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
