import useIsMobile from '../hooks/useIsMobile';
import MobileHeader from './MobileHeader';
import StandardHeader from './StandardHeader';

function AppHeader({ cart }) {
  const isMobile = useIsMobile(700);

  return isMobile ? <MobileHeader cart={cart} /> : <StandardHeader cart={cart} />;
}

export default AppHeader;