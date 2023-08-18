package project.aspect;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Before("execution(* project.controllers.*.*(..))")
    public void logBeforeControllerExecution() {
        logger.info("Called a controller method");
    }

    @After("execution(* project.controllers.*.*(..))")
    public void logAfterControllerExecution() {
        logger.info("Finished calling the method");
    }
}
