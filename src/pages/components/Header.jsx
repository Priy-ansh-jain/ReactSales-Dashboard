
const Header = ({ category, title }) => {
  return (
    <div>
      <div className="text-orange-500 text-2xl font-bold p-2 pb-4 ">
        <p>
          {category}
        </p>
        <p className="">{title}</p>
      </div>
    </div>
  )
}

export default Header
