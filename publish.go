package main

import (
	"context"
	"github.com/go-redis/redis/v8"
)

func main() {
	ctx := context.Background()

	rdb := redis.NewClient(&redis.Options{
		Addr:	  "localhost:6379",
		Password: "sOmE_sEcUrE_pAsS", // no password set
		DB:		  0,  // use default DB
	})

	err := rdb.Publish(ctx, "channels.order.purchase", "payload").Err()
	if err != nil {
		panic(err)
	}


}