import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFoundPage = () => {
  return (
    <div >
      <LottieImage/>
    </div>
  )
}
 
export default NotFoundPage


const LottieImage = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/b20f63ce-844b-4b9a-ac4e-607120a6db56/hut79SZ8Pe.lottie"
      loop
      autoplay
      content='Page Not Found'
    />
  );
};


