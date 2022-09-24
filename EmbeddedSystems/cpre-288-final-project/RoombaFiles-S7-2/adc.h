/*
 * adc.h
 *
 *  Created on: Oct 20, 2021
 *      Author: cbdeboef
 */

#ifndef ADC_H_
#define ADC_H_
#include <stdint.h>
#include <stdbool.h>
#include <inc/tm4c123gh6pm.h>
#include "driverlib/interrupt.h"

void adc_init();

int adc_read_raw();

int adc_read_distance();

#endif
