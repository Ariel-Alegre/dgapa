import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormTuristic from './FormTuristic';
import TransportCard from './TransportCards';
import FormPayment from './FormPayment';
import { useLocation } from "react-router-dom";



const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

// Función principal
export default function BookingForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleStep = (step) => () => setActiveStep(step);

  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // Renderiza el formulario adecuado basado en el paso activo
  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return <FormTuristic handleNext={handleNext} />;
      case 1:
        return <TransportCard handleNext={handleNext} />;
      case 2:
        return <FormPayment handleNext={handleNext}  />;
      default:
        return null;
    }
  };

  return (
<div>

    <Box sx={{ width: '95%', margin: 'auto' }}>
      <Stepper nonLinear activeStep={activeStep} >
        {steps.map((label, index) => (
          <Step  key={label} completed={completed[index]} >
            <StepButton color="inherit" onClick={handleStep(index)}/>
            {label}
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
        
            {renderForm()}
            
          
          </React.Fragment>
        )}
      </div>
    </Box>

<footer id="footer" class="footer dark-background">
<div class="container footer-top">
  <div class="row gy-4">
    <div class="col-lg-4 col-md-6 footer-about">
      <a href="index.html" class="logo d-flex align-items-center">
        <span class="sitename">UpConstruction</span>
      </a>
      <div class="footer-contact pt-3">
        <p>A108 Adam Street</p>
        <p>New York, NY 535022</p>
        <p class="mt-3">
          <strong>Phone:</strong> <span>+1 5589 55488 55</span>
        </p>
        <p>
          <strong>Email:</strong> <span>info@example.com</span>
        </p>
      </div>
      <div class="social-links d-flex mt-4">
        <a href="">
          <i class="bi bi-twitter-x"></i>
        </a>
        <a href="">
          <i class="bi bi-facebook"></i>
        </a>
        <a href="">
          <i class="bi bi-instagram"></i>
        </a>
        <a href="">
          <i class="bi bi-linkedin"></i>
        </a>
      </div>
    </div>

    <div class="col-lg-2 col-md-3 footer-links">
      <h4>Useful Links</h4>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About us</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Terms of service</a>
        </li>
        <li>
          <a href="#">Privacy policy</a>
        </li>
      </ul>
    </div>

    <div class="col-lg-2 col-md-3 footer-links">
      <h4>Our Services</h4>
      <ul>
        <li>
          <a href="#">Web Design</a>
        </li>
        <li>
          <a href="#">Web Development</a>
        </li>
        <li>
          <a href="#">Product Management</a>
        </li>
        <li>
          <a href="#">Marketing</a>
        </li>
        <li>
          <a href="#">Graphic Design</a>
        </li>
      </ul>
    </div>

    <div class="col-lg-2 col-md-3 footer-links">
      <h4>Hic solutasetp</h4>
      <ul>
        <li>
          <a href="#">Molestiae accusamus iure</a>
        </li>
        <li>
          <a href="#">Excepturi dignissimos</a>
        </li>
        <li>
          <a href="#">Suscipit distinctio</a>
        </li>
        <li>
          <a href="#">Dilecta</a>
        </li>
        <li>
          <a href="#">Sit quas consectetur</a>
        </li>
      </ul>
    </div>

    <div class="col-lg-2 col-md-3 footer-links">
      <h4>Nobis illum</h4>
      <ul>
        <li>
          <a href="#">Ipsam</a>
        </li>
        <li>
          <a href="#">Laudantium dolorum</a>
        </li>
        <li>
          <a href="#">Dinera</a>
        </li>
        <li>
          <a href="#">Trodelas</a>
        </li>
        <li>
          <a href="#">Flexo</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="container copyright text-center mt-4">
  <p>
    © <span>Copyright</span>{" "}
    <strong class="px-1 sitename">UpConstruction</strong>{" "}
    <span>All Rights Reserved</span>
  </p>
  <div class="credits">
    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
  </div>
</div>
</footer>
  
</div>
  );
}
