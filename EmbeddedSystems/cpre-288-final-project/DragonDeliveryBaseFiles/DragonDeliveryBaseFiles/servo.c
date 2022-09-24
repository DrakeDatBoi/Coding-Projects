/*
 * servo.c
 *
 *  Created on: Nov 3, 2021
 *      Author: ridgeway
 */

#include "servo.h"
#include <inc/tm4c123gh6pm.h>
#include <stdint.h>
#include <stdbool.h>
#include "Timer.h"
#include "lcd.h"


void servo_initialize(){

    SYSCTL_RCGCTIMER_R |= 0b000010; //enables timer 1
    SYSCTL_RCGCGPIO_R  |= 0b000010; //enables port B
    GPIO_PORTB_DEN_R |= 0b00100000; //digital enable
    GPIO_PORTB_DIR_R |= 0b00100000; //direction

    GPIO_PORTB_AFSEL_R |=0b00100000; //enable alternate function
    GPIO_PORTB_PCTL_R |= 0x00700000; //7th af on pin b timer1

    TIMER1_CTL_R &= 0xFEFF;//disable and force PWM output to zero(not inverted)
   // TIMER1_CTL_R |= 0x4000; //inverts signal
    TIMER1_CFG_R |= 0x0004;   //configure timer to specified value from datasheet
    TIMER1_TBMR_R |= 0x000A;  //enables PWM mode and sets timer mode to periodic
    TIMER1_TBMR_R &= 0xFFEF; //count down mode


    TIMER1_TBPR_R  = 0x0004; //set prescale value /320000 = 0x4E200 (= not |=, dont care about preserving bits)
    TIMER1_TBILR_R = 0xE200; //reads current value

    TIMER1_CTL_R |= 0x0100;   //enable
}

int servo_movement(float degrees){


       TIMER1_TBPMR_R = 0x0004; //upper bound for matchr register    / 304000 = 4A380 = 320000-16000 = number of ticks left in timer after 1 ms.



       //TIMER1_TBMATCHR_R = 0xC3E0; //0 == C3E0
       //TIMER1_TBMATCHR_R = 0x5030; //180 == 5030
       int s = 312228 - 164.35 * degrees;
       TIMER1_TBMATCHR_R = s;
       lcd_printf("Position: %d", s);
       return s;


return 0;
}
