cmd_Release/obj.target/temperature.node := g++ -shared -pthread -rdynamic -m32  -Wl,-soname=temperature.node -o Release/obj.target/temperature.node -Wl,--start-group Release/obj.target/temperature/temperature_ds18b20.o -Wl,--end-group -lmraa
