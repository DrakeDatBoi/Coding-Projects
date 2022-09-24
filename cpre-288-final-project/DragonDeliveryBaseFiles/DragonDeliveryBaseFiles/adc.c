/*
 * adc.c
 *
 *  Created on: Oct 21, 2021
 *      Author: ridgeway
 */

#include "adc.h"
#include <inc/tm4c123gh6pm.h>
#include <stdint.h>
#include <stdbool.h>
#include "driverlib/interrupt.h"

void adc_init(void){

    SYSCTL_RCGCADC_R   |=  0x0001;
    SYSCTL_RCGCGPIO_R  |=  0b00000010;


    //PORT B
    GPIO_PORTB_AFSEL_R |=  0b00010000;
    GPIO_PORTB_DEN_R   &= ~0b00010000;
    GPIO_PORTB_AMSEL_R |=  0b00010000;

    ADC0_ACTSS_R  &= 0b1110;

    //Sample Sequencer 0
    ADC0_SSMUX0_R |= 0x000A;
    ADC0_EMUX_R   &= 0x0000;
    ADC0_SSCTL0_R |= 0x0002;

    ADC0_IM_R     |= 0x0001;
    ADC0_ACTSS_R  |= 0x0001;
    ADC0_SAC_R    |= 0b100;
}

int adc_read(void){

    ADC0_PSSI_R |= 0x0001;
    while((ADC0_RIS_R & 0x0001) == 0){}

    return ADC0_SSFIFO0_R;
}
