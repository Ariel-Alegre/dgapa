export default function Navbar() {
    return (
        <div>
            <header id="header" class="header d-flex align-items-center fixed-top">
          <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
      
            <a href="/" class="logo d-flex align-items-center">
              <h1 class="sitename">UpConstruction</h1> <span>.</span>
            </a>
      
            <nav id="navmenu" class="navmenu">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about"  class="active" >About</a></li>
                <li><a href="/services">Services</a></li>
             
                <li><a href="/contact">Contact</a></li>
              </ul>
     {/*          <i class="mobile-nav-toggle d-xl-none bi bi-list"><BsList/></i> */}
            </nav>
      
          </div>
        </header>
        </div>
    )
}