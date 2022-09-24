/*
 * servo.c
 *
 *  Created on: Nov 3, 2021
 *      Author: cbdeboef
 */

#include "servo.h"
#include <inc/tm4c123gh6pm.h>
#include <stdbool.h>
#include <stdint.h>

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

int servo_move(int degree){
    TIMER1_CTL_R &= ~0b100000000;
    float time = 0;
    unsigned int cycles = 0;
//    time = 1.0 + degree / 180.0;
//    cycles = 320000 - 16000.0 * time;
    cycles = 311466 - 165 * degree;

    TIMER1_TBPMR_R = (cycles & 0xF0000)>>16;
    TIMER1_TBMATCHR_R = (cycles & 0xFFFF);

    TIMER1_CTL_R |= 0b100000000;

    return 0;
}
