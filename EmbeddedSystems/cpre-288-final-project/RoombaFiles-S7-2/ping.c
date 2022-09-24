/*
 * ping.c
 *
 *  Created on: Oct 27, 2021
 *      Author: cbdeboef
 */

#include "ping.h"
#include "timer.h"
#include "driverlib/interrupt.h"
#include <inc/tm4c123gh6pm.h>
#include <stdbool.h>
#include <stdint.h>

volatile long risingEdgeRead = 0;
volatile char risingEdgeFlag = 0;

volatile long fallingEdgeRead = 0;
volatile char fallingEdgeFlag = 0;

void ping_init(){
    SYSCTL_RCGCGPIO_R |= 0b10;
    SYSCTL_RCGCTIMER_R |= 0b1000;
    //timer_init();
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
    //TIMER3_CTL_R |= 0b100000000;

    IntRegister(INT_TIMER3B, ping_interrupt_handler);
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

//    TIMER3_ICR_R &= 0b10000000000;

    while(fallingEdgeFlag == 0){

    }
    risingEdgeFlag = 0;
    fallingEdgeFlag = 0;
    timer_waitMillis(1);
    return risingEdgeRead - fallingEdgeRead;

}

void ping_interrupt_handler()
{
    // Clear interrupt status register
       // GPIO_PORTE_ICR_R =
       // update button_event = 1;
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
