import './styles.css'



type SelectMenuProps = {
    data?: any
    title?: any
    onSelect?: any
}

export const SelectCreator: React.FC<SelectMenuProps> = ({
    data,
    title,
    onSelect
}) => { 

    const menu = data?.map((child: any) => {
        return (
            <option data-dataObj={child.toString()} value={child._id}>{child.title}</option>
        )
    })  || []

    const dropdownmenu = (
        <select 
            name={title}
            onChange={onSelect}
        >
            {menu}
        </select>
    )
    return dropdownmenu
}