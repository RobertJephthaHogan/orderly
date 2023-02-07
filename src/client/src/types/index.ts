




export type User = {
	id: any
	firstName: any
	lastName: any
    email: any
    password: any
    phoneNumber: any
    todos: any
    events: any 
    accountsInfo: any
    role: any
}


export type ToDo = {
	id: string
	title: string
	description: string
    category: string
    priority: string
    usersIncluded: any
    createdByUserID: any
    isCompleted: boolean
    taskCreationTime: Date
    dueDate: Date
}
  

export type CalendarEvent = {
	id: string
	title: string
	description: string
    category: any
    startTime: any
    endTime: any
}