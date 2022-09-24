/*
 * ping.c
 *
 *  Created on: Oct 27, 2021
 *      Author: ridgeway
 */

#include "ping.h"
#include <inc/tm4c123gh6pm.h>
#include <stdint.h>
#include <stdbool.h>
#include "driverlib/interrupt.h"
#include "Timer.h"

volatile enum {LOW, HIGH, DONE} state;
volatile unsigned int rising_time;
volatile unsigned int falling_time;
volatile int overflow = 0;

void ping_initialize(void){

    SYSCTL_RCGCTIMER_R |= 0b001000;
    SYSCTL_RCGCGPIO_R  |= 0b000010;
    GPIO_PORTB_DEN_R   |= 0b00001000;

    TIMER3_CTL_R   &= 0xFEFF;  //disable Timer B
    TIMER3_CFG_R   |= 0x00000004; //timer config
    TIMER3_TBMR_R  |= 0x0007; //capture mode , edge time mode
    TIMER3_TBMR_R  &= 0xFFEF; //count down mode
    TIMER3_CTL_R   |= 0x0C00; //both edge triggers
    TIMER3_TBPR_R  |= 0x00FF; //set prescale value
    TIMER3_TBILR_R |= 0xFFFF; //set max val
    TIMER3_IMR_R   |= 0x0400; //enable timer 3B interrupt
    NVIC_EN1_R         |= 0x0010;
    NVIC_PRI9_R        |= 0x20;

    state = LOW;

    IntRegister(INT_TIMER3B, TIMER3B_Handle); //binds interrupts
    IntMasterEnable();
}

int ping_read(void){

   send_pulse();

   while(state != DONE){}
       state = LOW;
       int y;
       if(falling_time > rising_time){
           overflow++;
           y = (0xFFFF - falling_time) + rising_time; //true time difference in case of overflow
       }
       else{
           y = rising_time - falling_time;
       }
       return y;
}

void send_pulse(void){

    TIMER3_CTL_R       &= 0xFEFF;
    TIMER3_IMR_R       &= 0xFBFF; //mask
    GPIO_PORTB_AFSEL_R &= ~0b00001000;
    GPIO_PORTB_DIR_R   |= 0b00001000; //configure output
    GPIO_PORTB_DATA_R  |= ~0b11110111; //set high

    timer_waitMicros(10); //wait at least 5 microseconds

    GPIO_PORTB_DATA_R  &= 0b11110111; //set low
    GPIO_PORTB_DIR_R   &= ~0b00001000; //configure for input
    GPIO_PORTB_AFSEL_R |= 0b00001000; //enable alternate fuctions for pin b
    GPIO_PORTB_PCTL_R  |= 0x7000; //7th function on pin B
    TIMER3_ICR_R       |= 0x0400;//clear
    TIMER3_IMR_R       |= 0x0400; //unmask
    TIMER3_CTL_R       |= 0x0100;
}

void TIMER3B_Handle(void){

    TIMER3_ICR_R |= 0x0400;   //clear
    if(state == LOW){
        rising_time = TIMER3_TBR_R;
        state = HIGH;
    } else if(state == HIGH){
        falling_time = TIMER3_TBR_R;
        state = DONE;
    }


}




