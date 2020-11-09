import { useRouter } from 'next/router';
import Link from 'next/link';
import Detail from '../../../components/farm/Detail';


const Farm = () => {
    const router = useRouter()
    const { id } = router.query;

    return (
        <Detail id={id} />
    )
}

export default Farm