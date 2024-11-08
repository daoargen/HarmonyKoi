import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useQueryClient } from '@tanstack/react-query'

import { getMeQueryKey } from '../../../../apis/users.api'
import Logo from '../../../../components/common/Logo'
import { Avatar, AvatarImage } from '../../../../components/ui/avatar'
import { Button } from '../../../../components/ui/button'
import configs from '../../../../configs'
import { signOut } from '../../../../context/auth.reducer'
import useAuth from '../../../../hooks/useAuth'
import navLinks from '../../../../layouts/MainLayout/data/navLinks'
import { cn } from '../../../../lib/utils'

import Container from '../Container'

const Header = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, dispatch } = useAuth()

  const handleLogout = () => {
    dispatch(signOut())
    queryClient.removeQueries({
      queryKey: [getMeQueryKey]
    })
    navigate(configs.routes.login)
  }

  return (
    <header className='sticky -top-3 z-40 w-full bg-white'>
      <Container>
        <div className='flex items-center pt-7 pb-4'>
          <Logo />
          <nav className='flex gap-[100px] ml-auto mr-[100px]'>
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn('text-lg text-[rgba(0,_0,_0,_0.85)] font-medium leading-4', {
                    'text-primary': isActive
                  })
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          {user ? (
            <div className='flex items-center gap-[30px]'>
              <Link to={configs.routes.cart}>
                <AiOutlineShoppingCart size={32} />
              </Link>

              <Avatar onClick={handleLogout}>
                <AvatarImage src={user.avatarUrl || ''} alt={user.firstName} />
                {/* <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback> */}
              </Avatar>
            </div>
          ) : (
            <Link to={configs.routes.login}>
              <Button className='px-7 h-11 leading-11 text-base font-semibold rounded-full'>Đăng nhập</Button>
            </Link>
          )}
        </div>
      </Container>
    </header>
  )
}

export default Header
