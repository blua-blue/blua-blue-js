interface Image{
	readonly id?: string,
	format?: string,
	path?: string,
	inserter_user_id?: string,
	readonly insert_date_st: number,
	insert_date: string,
	readonly delete_date_st: number,
	delete_date?: string,
}

export {Image}