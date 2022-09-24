#include "dragonDeliveryScan.h"
#include "math.h"
#include "timer.h"
#include "driverlib/interrupt.h"
#include "inc/tm4c123gh6pm.h"
#include "stdbool.h"
#include "stdint.h"

volatile long risingEdgeRead = 0;
volatile char risingEdgeFlag = 0;
volatile long fallingEdgeRead = 0;
volatile char fallingEdgeFlag = 0;
volatile char mode = 0;

void adc_init(){
    SYSCTL_RCGCGPIO_R |= 0b10;
    SYSCTL_RCGCADC_R |= 0b1;
    GPIO_PORTB_DIR_R &= 0xFFFFFFEF;
    GPIO_PORTB_DEN_R &= 0xFFFFFFEF;
    GPIO_PORTB_AFSEL_R |= 0b10000;
    GPIO_PORTB_AMSEL_R |= 0b10000;

    ADC0_ACTSS_R &= 0xFFFFFFF0;
    ADC0_EMUX_R &= 0xFFFF0000;
    ADC0_SSCTL0_R &= 0xF;
    ADC0_SSCTL0_R &= 0xFFFFFFF0;
    ADC0_SSCTL0_R |= 0b0110;
    ADC0_SSMUX0_R = 0xA;
    ADC0_ACTSS_R |= 0b1;

}

void servo_init(){
    SYSCTL_RCGCGPIO_R |= 0b10;
    GPIO_PORTB_DEN_R |= 0b100000;
    GPIO_PORTB_DIR_R |= 0b100000;
    GPIO_PORTB_AFSEL_R |= 0b100000;
    GPIO_PORTB_PCTL_R &= ~0xF00000;
    GPIO_PORTB_PCTL_R |= 0x700000;

    SYSCTL_RCGCTIMER_R |= 0b10;
    TIMER1_CTL_R &= ~0b100000001;
    TIMER1_CFG_R = 0x4;
    TIMER1_TBMR_R |= 0b1010;
    TIMER1_TBMR_R &= ~0b101;
    TIMER1_CTL_R &= ~0b100000000000000;
    TIMER1_TBPR_R |= 0x04;
    TIMER1_TBILR_R = 0xE200;
    TIMER1_TBPMR_R = 0x04;
    TIMER1_TBMATCHR_R = 0x86A8;
    TIMER1_CTL_R |= 0b100000001;
}

void ping_init(){
    SYSCTL_RCGCGPIO_R |= 0b10;
    SYSCTL_RCGCTIMER_R |= 0b1000;
    TIMER3_CTL_R &= ~0b100000001;
    TIMER3_CFG_R = 0x4;

    GPIO_PORTB_DEN_R |= 0b1000;
    TIMER3_ICR_R |= 0xFFFFFFFF;
    NVIC_EN1_R |= 0b10000;
    TIMER3_IMR_R &= ~0b10000000000;

    TIMER3_TBMR_R |= 0b111;
    TIMER3_TBMR_R &= 0b1111;
    TIMER3_CTL_R |= 0b110000000000;
    TIMER3_TBILR_R = 0xFFFF;
    TIMER3_TBPR_R = 0xFF;
    TIMER3_IMR_R |= 0b10000000000;

    IntRegister(INT_TIMER3B, ping_interrupt_handler);
}

void uart_init(int baud){
    SYSCTL_RCGCGPIO_R |= 0b00000010;      // enable clock GPIOB (page 340)
    SYSCTL_RCGCUART_R |= 0b00000010;      // enable clock UART1 (page 344)
    GPIO_PORTB_AFSEL_R |= 0b00000011;      // sets PB0 and PB1 as peripherals (page 671)
    GPIO_PORTB_PCTL_R  |= 0x00000011;       // pmc0 and pmc1       (page 688)  also refer to page 650
    GPIO_PORTB_DEN_R   |= 0b00000011;        // enables pb0 and pb1
    GPIO_PORTB_DIR_R   |= 0b00000001;        // sets pb0 as output, pb1 as input

    double fbrd;
    int    ibrd;
    double brd;

    if(UART1_CTL_R & 0x00000020){
        brd = 16000000.0 / (8.0 * baud);
    }
    else{
        brd = 16000000.0 / (16.0 * baud);
    }

    ibrd = (int) brd;
    fbrd = brd - ibrd; // page 903


    UART1_CTL_R &= 0b11111110;      // disable UART1 (page 918)
    UART1_IBRD_R = ibrd;        // write integer portion of BRD to IBRD
    UART1_FBRD_R = (int) (fbrd * 64.0 + 0.5);   // write fractional portion of BRD to FBRD
    UART1_LCRH_R = 0b01100000;        // write serial communication parameters (page 916) * 8bit and no parity
    UART1_CC_R   &= 0xFFFFFFF0;;          // use system clock as clock source (page 939)
    UART1_CTL_R |= 0b1100000001;        // enable UART1
}

void uart_interupt_init(){
    UART1_IM_R |= 0x10;
    NVIC_EN0_R |= 0b1000000;
    IntRegister(INT_UART1, uart_interupt_handler);
}

int adc_read_raw(){
    ADC0_PSSI_R |= 0b1;
    ADC0_SAC_R &= ~0b011;
    int data = ADC0_SSFIFO0_R & 0xFFF;
    return data;
}

int adc_read_distance(){
    int data = adc_read_raw();
    int distance = 933300000 * pow(data,-2.422) + 6.169;
    return distance;
}

int servo_move(int degree){
    TIMER1_CTL_R &= ~0b100000000;
//    float time = 0;
    unsigned int cycles = 0;
//    time = 1.0 + degree / 180.0;
//    cycles = 320000 - 16000.0 * time;
    cycles = 311466 - 165 * degree;

    TIMER1_TBPMR_R = (cycles & 0xF0000)>>16;
    TIMER1_TBMATCHR_R = (cycles & 0xFFFF);

    TIMER1_CTL_R |= 0b100000000;

    return 0;
}

long ping_read(){
    TIMER3_CTL_R &= ~0b100000000;
    TIMER3_IMR_R &= ~0b10000000000;
    TIMER3_ICR_R |= 0b10000000000;
    risingEdgeFlag = 0;
    fallingEdgeFlag = 0;

    GPIO_PORTB_AFSEL_R &= ~0b1000;
    GPIO_PORTB_DIR_R |= 0b1000;

    GPIO_PORTB_DATA_R |= 0b1000;
    timer_waitMicros(10);
    GPIO_PORTB_DATA_R &= ~0b1000;

    TIMER3_ICR_R |= 0b10000000000;
    TIMER3_IMR_R |= 0b10000000000;


    GPIO_PORTB_DIR_R &= ~0b1000;
    GPIO_PORTB_AFSEL_R |= 0b1000;
    GPIO_PORTB_PCTL_R &= 0xFFFF0FFF;
    GPIO_PORTB_PCTL_R |= 0x7000;

    TIMER3_CTL_R |= 0b100000000;

    while(fallingEdgeFlag == 0){

    }
    risingEdgeFlag = 0;
    fallingEdgeFlag = 0;
    timer_waitMillis(1);
    return risingEdgeRead - fallingEdgeRead;

}

float ping_read_distance(){
    long delta = ping_read();
    if(delta <= 0){
        delta = delta + 16777215;
    }

    float distance = delta * 17 / 16000;
    return distance;
}

void ping_interrupt_handler(){
    if(risingEdgeFlag == 0){
        risingEdgeRead = TIMER3_TBR_R;
        risingEdgeFlag = 1;
    }

    else{
        fallingEdgeRead = TIMER3_TBR_R;
        fallingEdgeFlag = 1;
    }
    TIMER3_ICR_R |= 0b10000000000;

}

void uart_sendChar(char data){
    while(UART1_FR_R & 0b00100000){

    }

    UART1_DR_R = data;
}

char uart_receive(void){
    char data = 0;

    while(UART1_FR_R & 0b00010000){

    }

    data = (char) (UART1_DR_R & 0xFF);

    return data;
}

void uart_sendStr(const char *data){
    int i = 0;

    while(*(data + i) != '\0'){
        uart_sendChar(*(data + i));
        i++;
    }
}

void uart_interupt_handler(){
    UART1_ICR_R |= 0x10;
    char receivedData;
    receivedData = UART1_DR_R & 0xFF;
    if(receivedData == 't'){
        mode = !mode;
    }

    receivedData = UART1_DR_R & 0xFF;
    uart_sendChar(receivedData);
}

void dragonDelivery_init(){
    adc_init();
    ping_init();
    servo_init();
}

void get_scan(int degree, dragonDelivery_scan_t * scanData){
    servo_move(degree);

    scanData->IR_distance = adc_read_distance();
    scanData->IR_raw_value = adc_read_raw();
    scanData->ping_distance = ping_read_distance();
}
