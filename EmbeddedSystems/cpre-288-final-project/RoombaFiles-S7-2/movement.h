/*
 * movement.h
 *
 *  Created on: Sep 8, 2021
 *      Author: trolston
 */

#ifndef MOVEMENT_H_
#define MOVEMENT_H_

#include "open_interface.h"
#include "uart.h"
#include "Timer.h"
#include "lcd.h"

void move_forward(oi_t *sensor, double centimeters);
//go forward specified distance and stop

void move_backward(oi_t *sensor, double centimeters);
//go backward specified distance and stop

void turn_clockwise(oi_t *sensor, double degrees);
//turn right specified degrees

void turn_anticlockwise(oi_t *sensor, double degrees);
//turn left specified degrees

#endif /* MOVEMENT_H_ */
