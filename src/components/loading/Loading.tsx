import React from 'react'
import classes from './Loading.module.css'

const Loading: React.FC = () => {
	return (
		<div className={classes.container}>
			<span className={classes.text}>
				Loading
				<span className={classes.dots}>
					<span>.</span>
					<span>.</span>
					<span>.</span>
				</span>
			</span>
		</div>
	)
}

export default Loading
