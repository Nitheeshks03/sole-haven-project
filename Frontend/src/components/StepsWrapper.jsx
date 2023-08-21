import { AddressProvider } from '../contexts/AddressContext';
import Steps from './Steps';

const StepsWrapper = () => {
    return (
        <AddressProvider>
        <Steps/>
        </AddressProvider>
    );
    };

export default StepsWrapper;