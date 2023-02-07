import React from 'react'


type Props = {

}

export const NotesByCategory: React.FC<Props> = () => {
	return (
		<div>
			<div className='top-bar-wrapper'>
				<div className='top-bar'>
					Notes By Category Top Bar
				</div>
			</div>
			<div className='body-wrapper'>
				<div className='body-content'>
					<div className='notes-menu-wrapper'>
						<div className='pl-2 pt-2'>
							<h4>Notes</h4>
						</div>
						<div className='divider'/>
						<div className='pl-2 pt-2'>
							menu was here
						</div>
					</div>
					<div className='notes-display-wrapper'>
						<div className='note-section'>
							overview
						</div>
						<div className='note-section'>
                            notes todos
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
