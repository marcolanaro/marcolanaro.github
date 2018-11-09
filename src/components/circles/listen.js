import open from '../../handlers/open';
import { addEventListener } from '../../utils';
import { circles } from './get';

const listen = () => {
  circles.forEach(
    addEventListener({ event: 'click', callback: open, once: false })
  );
};

export default listen;
