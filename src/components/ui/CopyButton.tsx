import React, { useState } from 'react'
import { Copy } from '../icons/copy'

interface CopyButtonProps {
	text: string
	copyIcon?: React.ReactNode
	className?: string
	children: React.ReactNode
}

const CopyButton = ({ text, copyIcon, className, children }: CopyButtonProps) => {
	const [copied, setCopied] = useState(false)

	return (
		<button
			onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()
				navigator.clipboard
					.writeText(text)
					.then(() => {
						setCopied(true)
						setTimeout(() => {
							setCopied(false)
						}, 2000)
					})
					.catch((error) => {
						console.error('Error copying: ', error)
					})
			}}
			className={className}
		>
			{children}
			{copied ? <div className="h-4">✔︎</div> : copyIcon || <Copy />}
		</button>
	)
}

export default CopyButton
