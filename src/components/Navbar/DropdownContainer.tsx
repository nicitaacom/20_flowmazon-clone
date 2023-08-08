import useCloseOnClickOutlise from '../../hooks/useCloseOnClickOutside';

interface DropdownContainerProps {
  children: React.ReactNode
  size?: number
  icon: React.ReactElement
  className?: string
}

export function DropdownContainer({ children, icon, className = '' }: DropdownContainerProps) {

  const { isDropdown, dropdownContainerRef, setIsDropdown } = useCloseOnClickOutlise()

  return (
    <div className={`relative z-10`} ref={dropdownContainerRef}>
      <div className="cursor-pointer" onClick={() => setIsDropdown(!isDropdown)}>
        {icon}
      </div>

      <div className={`absolute top-[45px] right-[0%] w-[500px] z-[2] text-secondary bg-primary ${className}
      before:w-4 before:h-4 before:bg-primary before:border-l-[1px] before:border-t-[1px] before:border-solid before:border-secondary
       before:rotate-45 before:absolute before:top-[-8px] before:right-[0] before:translate-x-[-50%]
       ${isDropdown ? 'opacity-100 visible translate-y-0 transition-all duration-300' : 'opacity-0 invisible translate-y-[-20px] transition-all duration-300'}`}>
        <div className='text-md border-[1px] border-solid border-secondary rounded-md'>
          {children}
        </div>
      </div>
    </div>

  )
}


// css
/*
<div className={`dropdown-container`} ref={dropdownContainerRef}>
      <BiUserCircle className="menu-trigger" onClick={() => setIsDropdown(!isDropdown)} />

      <div className={`dropdown-menu ${isDropdown ? 'dropdown-active' : 'dropdown-inactive'}`}>
        <div className='dropdown-menu-title'><h3>The Kiet</h3><span className='subTitle'>Webiste Designer</span></div>
        <ul>
          {children}
        </ul>
      </div>
    </div>
*/