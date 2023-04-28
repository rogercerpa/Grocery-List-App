export default function Header(props) {
  return (
    <nav className={props.darkMode ? "dark" : ""}>
      <div className="flex items-center">
        <p className="toggler--light">Light</p>
        <div
          className="w-6 h-3 bg-[#2B283A] rounded-full mx-1 cursor-pointer flex items-center justify-start border border-black box-content"
          onClick={props.toggleDarkMode}
        >
          <div className="toggler--slider--circle"></div>
        </div>
        <p className="toggler--dark">Dark</p>
      </div>
    </nav>
  );
}
