/*
 * adc.c
 *
 *  Created on: Oct 20, 2021
 *      Author: cbdeboef
 */

#include "adc.h"
#include "math.h"

void adc_init(){
    //using AIN10 on PB4
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
