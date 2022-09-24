/*
 * movement.h
 *
 *  Created on: Sep 8, 2021
 *      Author: ridgeway
 */

#ifndef MOVEMENT_H_
#define MOVEMENT_H_

#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>
#include "Timer.h"
#include <inc/tm4c123gh6pm.h>
#include "lcd.h"
#include "open_interface.h"
#include "uart.h"
#include "driverlib/interrupt.h"

extern volatile  char uart_data;  // Your UART interupt code can place read data here
extern volatile  char flag;

void move_forward(oi_t *sensor, int centimeters);

void move_backward(oi_t *sensor_data, int centimeters);

void turn_clockwise(oi_t *sensor, int degrees);

void turn_counterclockwise(oi_t *sensor_data, int degrees);

void sensor(oi_t *sensor_data);

#endif /* MOVEMENT_H_ */
