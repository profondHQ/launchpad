import { useEffect } from 'react'
import { useTimer } from 'react-timer-hook'

const useCountdown = ({ time }: {time?: number}) => {
	const { seconds, minutes, hours, days, restart, isRunning } = useTimer({
		expiryTimestamp: new Date(),
		autoStart: false,
	})

	useEffect(() => {
		if (time) restart(new Date(time))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [time])

	return {
		seconds,
		minutes,
		hours,
		days,
		restart,
		isRunning,
	}
}

export default useCountdown