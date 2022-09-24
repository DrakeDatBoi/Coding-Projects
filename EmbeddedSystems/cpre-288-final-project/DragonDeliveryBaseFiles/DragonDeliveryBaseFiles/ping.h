/*
 * ping.h
 *
 *  Created on: Oct 27, 2021
 *      Author: ridgeway
 */

#ifndef PING_H_
#define PING_H_

void ping_initialize(void);

int ping_read(void);

void send_pulse(void);

void TIMER3B_Handle(void);

#endif /* PING_H_ */
