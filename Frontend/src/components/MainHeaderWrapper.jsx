import { UserProvider } from '../contexts/UserContext';
import MainHeader from './MainHeader';
function MainHeaderWrapper() {
    return (
        <UserProvider>
            <MainHeader />
        </UserProvider>
    )
}

export default MainHeaderWrapper
