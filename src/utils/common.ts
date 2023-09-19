import { collectionConfig } from "@/config/collection"
import { ApiPromise } from "@polkadot/api"
import { Web3Storage } from "web3.storage"
import { BN, stringCamelCase, bnToBn, u8aToHex } from '@polkadot/util'
import type { WeightV2 } from '@polkadot/types/interfaces'
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto'

export const prettyTruncate = (str = '', len = 8, type: string) => {
	if (str && str.length > len) {
		if (type === 'address') {
			if (str.length !== len + 1) {
				const front = Math.ceil(len / 2)
				const back = str.length - (len - front)
				return `${str.slice(0, front)}...${str.slice(back)}`
			}
			return str
		}
		return `${str.slice(0, len)}...`
	}
	return str
}

export const uploadFiles = async(files: any)=>{
	const client = new Web3Storage({ token: collectionConfig.web3storage_token })
	const hash = await client.put(files)
	return hash
}

export const encode = function(s:string) {
	var out = [];
	for ( var i = 0; i < s.length; i++ ) {
		out[i] = s.charCodeAt(i);
	}
	return new Uint16Array( out );
}

export const saveJson = (obj:any, title:string)=> {
	var str = JSON.stringify(obj);
	var data = encode( str );

	var blob = new Blob( [ data ], {
		type: 'application/octet-stream'
	});
	
	var url = URL.createObjectURL( blob );
	var link = document.createElement( 'a' );
	link.setAttribute( 'href', url );
	link.setAttribute( 'download', `../../../temp/${title}.json` );
	var event = document.createEvent( 'MouseEvents' );
	event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	link.dispatchEvent( event );
}

export const getGasLimit = (api: ApiPromise, _refTime: string | BN, _proofSize: string | BN) => {
	const refTime = bnToBn(_refTime)
	const proofSize = bnToBn(_proofSize)

	return api.registry.createType('WeightV2', {
		refTime,
		proofSize,
	}) as WeightV2
}

export const getMaxGasLimit = (api: ApiPromise, reductionFactor = 0.8) => {
	const blockWeights = api.consts.system.blockWeights.toPrimitive() as any
	const maxExtrinsic = blockWeights?.perClass?.normal?.maxExtrinsic
	const maxRefTime = maxExtrinsic?.refTime
		? bnToBn(maxExtrinsic.refTime)
				.mul(new BN(reductionFactor * 100))
				.div(new BN(100))
		: new BN(0)
	const maxProofSize = maxExtrinsic?.proofSize
		? bnToBn(maxExtrinsic.proofSize)
				.mul(new BN(reductionFactor * 100))
				.div(new BN(100))
		: new BN(0)

	return getGasLimit(api, maxRefTime, maxProofSize)
}

export const getSs58Address = (format: number, address?: string) => {
	if (!address) return ''

	try {
		const ss58Address = encodeAddress(
			u8aToHex(decodeAddress(address)),
			format
		)
		return ss58Address
	} catch (error) {
		return address
	}
}