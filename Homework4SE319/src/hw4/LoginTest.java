package hw4;

import static org.junit.Assert.assertEquals;
import java.util.concurrent.TimeUnit;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class LoginTest {

	static WebDriver driver;

//	Change your selenium driver path here
	static String pathChromeDriver="C:/Users/drake/SE319/chromedriver.exe";
	static String pathLoginPage="E:/SE319/HW4/HW4-UITesting-Files/task1/validation.html";

	String firstName = "txtFirstName";
	String lastName = "txtLastName";
	String emailAddress = "txtEmailAddress";
	String phoneNumber = "txtPhoneNumber";
	String address = "txtAddress";
	String gender = "selectGender";
	String state = "selectState";
	String btnValidate = "btnValidate";
	String validationResult = "FinalResult";

	@BeforeClass
	public static void openBrowser()
	{
		System.setProperty("webdriver.chrome.driver", pathChromeDriver);
		driver= new ChromeDriver() ;
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	@AfterClass
	public static void closeBrowser() {
		driver.quit();
	}

	@Test
	public void loginSuccessTest() throws InterruptedException {
		driver.get(pathLoginPage);
		driver.manage().window().maximize();
		driver.findElement(By.xpath("//input[@id='" + firstName + "']")).sendKeys("Drake");
		driver.findElement(By.xpath("//input[@id='" + lastName + "']")).sendKeys("Ridgeway");
		
		Select user = new Select(driver.findElement(By.name(gender)));
		user.selectByVisibleText("Male");
		user = new Select(driver.findElement(By.name(state)));
		user.selectByVisibleText("Iowa");
		
		driver.findElement(By.xpath("//input[@id='" + emailAddress + "']")).sendKeys("ridgeway@iastate.edu");
		driver.findElement(By.xpath("//input[@id='" + phoneNumber + "']")).sendKeys("3194155614");
		driver.findElement(By.xpath("//input[@id='" + address + "']")).sendKeys("Ames,IA");

		Thread.sleep(1000);
		
		driver.findElement(By.xpath("//input[@id='" + btnValidate + "']")).click();
		String strMessage=driver.findElement(By.xpath("//label[@id='" + validationResult + "']")).getText();
		assertEquals("Failed test case", strMessage, "OK!");
	}

	@Test
	public void loginFailedTest() throws InterruptedException {
		driver.get(pathLoginPage);
		driver.manage().window().maximize();
		driver.findElement(By.xpath("//input[@id='" + firstName + "']")).sendKeys("Drake");
		driver.findElement(By.xpath("//input[@id='" + lastName + "']")).sendKeys("Ridgeway");
		
		Select user = new Select(driver.findElement(By.name(gender)));
		user.selectByVisibleText("Male");
		user = new Select(driver.findElement(By.name(state)));
		user.selectByVisibleText("Iowa");
		
		driver.findElement(By.xpath("//input[@id='" + emailAddress + "']")).sendKeys("ridgeway@iastate.edu");
		driver.findElement(By.xpath("//input[@id='" + phoneNumber + "']")).sendKeys("abcdefg");
		driver.findElement(By.xpath("//input[@id='" + address + "']")).sendKeys("Ames,IA");

		Thread.sleep(1000);
		driver.findElement(By.xpath("//input[@id='" + btnValidate + "']")).click();
		String strMessage=driver.findElement(By.xpath("//label[@id='" + validationResult + "']")).getText();
		assertEquals("Failed test case", strMessage, "Error");
	}




}
