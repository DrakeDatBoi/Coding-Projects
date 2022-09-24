#include "uart_interupts.h"

void uart_interupt_init(){

    UART1_IM_R |= 0x10;
    NVIC_EN0_R |= 0b1000000;
    IntRegister(INT_UART1, uart_interupt_handler);
}

void uart_interupt_handler(){
    UART1_ICR_R |= 0x10;
    char receivedData;
    receivedData = UART1_DR_R & 0xFF;
    if(receivedData == 't'){
        mode = !mode;
    }

    char receivedData;
    receivedData = UART1_DR_R & 0xFF;
    uart_sendChar(receivedData);
}
