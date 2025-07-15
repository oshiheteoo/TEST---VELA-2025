document.addEventListener('DOMContentLoaded', () => {
  const catalogBtn = document.getElementById('catalogBtn')
  const catalogDropdown = document.getElementById('catalogDropdown')
  const mobileMenu = document.getElementById('mobileMenu')
  const overlay = document.getElementById('menuOverlay')
  const menuBack = document.getElementById('menuBack')
  const menuTitle = document.getElementById('menuTitle')
  const preMenu = document.getElementById('preMenu')
  const innerMenu = mobileMenu.querySelector('.mobile-menu__inner')
  const openCatalogBtn = document.getElementById('openCatalogBtn')
  const hamburger = document.querySelector('.hamburger')

  let menuHistory = []
  let currentMenu = 'mainMenu'
  let isClosing = false

  function toggleCatalog() {
    catalogDropdown.classList.toggle('active')
    catalogBtn.classList.toggle('active')
  }

  function toggleMobileMenu() {
    if (mobileMenu.classList.contains('active')) {
      closeMobileMenu()
    } else {
      openMobileMenu()
    }
  }

  function openMobileMenu() {
    mobileMenu.classList.add('active')
    overlay.classList.add('active')
    document.body.style.overflow = 'hidden'
    catalogBtn.classList.add('menu-open')
    catalogBtn.classList.add('active')
    preMenu.style.display = 'block'
    innerMenu.style.display = 'none'
    showMainMenu()
    isClosing = false
  }

  function closeMobileMenu() {
    if (isClosing) return
    isClosing = true

    mobileMenu.classList.remove('active')
    overlay.classList.remove('active')

    catalogBtn.classList.remove('menu-open')

    setTimeout(() => {
      document.body.style.overflow = ''
      catalogBtn.classList.remove('active')
      preMenu.style.display = 'block'
      innerMenu.style.display = 'none'
      showMainMenu()
      isClosing = false
    }, 300)
  }

  function openCatalog() {
    preMenu.style.display = 'none'
    innerMenu.style.display = 'flex'
    showMainMenu()
  }

  function showSubmenu(menuId, title) {
    menuHistory.push({
      id: currentMenu,
      title: menuTitle.textContent,
    })

    document.getElementById(currentMenu).classList.remove('active')
    document.getElementById(menuId).classList.add('active')
    menuTitle.textContent = title
    menuBack.style.display = 'flex'
    currentMenu = menuId
  }

  function goBack() {
    if (menuHistory.length > 0) {
      const prev = menuHistory.pop()
      document.getElementById(currentMenu).classList.remove('active')
      document.getElementById(prev.id).classList.add('active')
      menuTitle.textContent = prev.title
      currentMenu = prev.id

      if (menuHistory.length === 0) {
        menuBack.style.display = 'none'
      }
    } else {
      preMenu.style.display = 'block'
      innerMenu.style.display = 'none'
      menuBack.style.display = 'none'
    }
  }

  function showMainMenu() {
    document.querySelectorAll('.mobile-menu__section').forEach((s) => {
      s.classList.remove('active')
    })
    document.getElementById('mainMenu').classList.add('active')
    menuTitle.textContent = 'Каталог'
    menuBack.style.display = 'none'
    currentMenu = 'mainMenu'
    menuHistory = []
  }

  function toggleGiftMenu(e) {
    e.preventDefault()
    const menu = document.getElementById('giftMenu')
    const navItem = document.getElementById('giftNavItem')
    menu.classList.toggle('active')
    navItem.classList.toggle('active')
  }

  function toggleEventsMenu(e) {
    e.preventDefault()
    const menu = document.getElementById('eventsDropdown')
    const navItem = document.getElementById('eventsNavItem')
    menu.classList.toggle('active')
    navItem.classList.toggle('active')
  }

  catalogBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (window.innerWidth <= 768) {
      toggleMobileMenu()
    } else {
      toggleCatalog()
    }
  })

  openCatalogBtn.addEventListener('click', (e) => {
    e.preventDefault()
    openCatalog()
  })

  menuBack.addEventListener('click', goBack)
  overlay.addEventListener('click', closeMobileMenu)

  document.addEventListener('click', (e) => {
    if (!catalogBtn.contains(e.target) && !catalogDropdown.contains(e.target)) {
      catalogDropdown.classList.remove('active')
      catalogBtn.classList.remove('active')
    }

    if (!document.getElementById('giftNavItem').contains(e.target)) {
      document.getElementById('giftMenu').classList.remove('active')
      document.getElementById('giftNavItem').classList.remove('active')
    }

    if (!document.getElementById('eventsNavItem').contains(e.target)) {
      document.getElementById('eventsDropdown').classList.remove('active')
      document.getElementById('eventsNavItem').classList.remove('active')
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu()
  })

  window.toggleGiftMenu = toggleGiftMenu
  window.toggleEventsMenu = toggleEventsMenu
  window.showSubmenu = showSubmenu
  window.closeMobileMenu = closeMobileMenu
  window.goBack = goBack
  window.showMainMenu = showMainMenu
  window.openCatalog = openCatalog
})
