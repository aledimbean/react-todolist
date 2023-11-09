/*
 Usage 
 <Button classes="class" text="Add" buttonStyle="primary">
    {text} --- BUTTON TEXT
    <Icon size={20}/> --- CHILDREN PROP
 </Button>
 */
interface IButton {
    text: string,
    children?: JSX.Element,
    classes?: string,
    buttonStyle: 'primary' | 'secondary' | 'error' | 'success',
    onClick: React.MouseEventHandler
}
export default function Button(props: IButton) {
    let styles:string = '';
    const styleButton = (style:string) => {
        if (style === 'primary') {
            styles += 'text-sm px-4 py-1 rounded-[5rem] text-white bg-mainColor border border-mainColor hover:text-mainColor hover:bg-white' 
        } else if (style === 'secondary') {
            styles += 'text-xs py-1 px-2 rounded-md text-white bg-[#838383] border-[#838383] hover:bg-[#c9c9c9]'
        } else if (style === 'error') {
            styles += 'text-xs py-1 px-2 rounded-md text-white bg-red-600 hover:bg-red-900'
        } else {
            styles += 'text-xs py-1 px-2 rounded-md text-white bg-green-600 hover:bg-green-900'
        }
        return styles;
    };
    return (
      <button className={`${props.classes} ${styleButton(props.buttonStyle)}`} onClick={props.onClick}>
        {props.text}
        {props.children}
      </button>
    );
  }