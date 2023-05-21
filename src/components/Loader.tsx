import { PuffLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex
      flex-col
      justify-center
      items-center
    "
    >
      <PuffLoader size={100} className="text-primary" />
    </div>
  )
}

export default Loader
