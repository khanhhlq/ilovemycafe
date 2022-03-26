// Import
import tippy, {createSingleton} from 'tippy.js';
import TippyGenerator from './Tippy';
import useSingletonGenerator from './useSingleton';
import forwardRef from './forwardRef';

const useSingleton = useSingletonGenerator(createSingleton);

// Export
export default forwardRef(TippyGenerator(tippy));
export {useSingleton, tippy};
