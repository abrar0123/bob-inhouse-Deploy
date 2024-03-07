import Home from './home/page';
import Wrapper from './layout-wrapper/wrapper';

export const metadata = {
  title: 'Home ',
};

export default function MainRoot() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
