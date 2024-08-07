-- CreateTable
CREATE TABLE "activityevents" (
    "activity_event_id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "address" VARCHAR(255),
    "start_time" TIMESTAMPTZ(6),
    "end_time" TIMESTAMPTZ(6),
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trip_id" UUID NOT NULL,

    CONSTRAINT "activityevents_pkey" PRIMARY KEY ("activity_event_id")
);

-- CreateTable
CREATE TABLE "lodgingevents" (
    "address" VARCHAR(255),
    "lodging_type" VARCHAR(255),
    "start_time" TIMESTAMPTZ(6),
    "end_time" TIMESTAMPTZ(6),
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trip_id" UUID NOT NULL,
    "lodging_event_id" SERIAL NOT NULL,

    CONSTRAINT "lodgingevents_pkey" PRIMARY KEY ("lodging_event_id")
);

-- CreateTable
CREATE TABLE "travelevents" (
    "travel_method" VARCHAR(255),
    "start_location" VARCHAR(255),
    "end_location" VARCHAR(255),
    "start_time" TIMESTAMPTZ(6),
    "end_time" TIMESTAMPTZ(6),
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trip_id" UUID NOT NULL,
    "travel_event_id" SERIAL NOT NULL,

    CONSTRAINT "travelevents_pkey" PRIMARY KEY ("travel_event_id")
);

-- CreateTable
CREATE TABLE "trips" (
    "title" VARCHAR(255),
    "notes" VARCHAR(255),
    "start_date" TIMESTAMPTZ(6),
    "end_date" TIMESTAMPTZ(6),
    "user_id" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "trip_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ(6),

    CONSTRAINT "trips_pkey" PRIMARY KEY ("trip_id")
);

-- AddForeignKey
ALTER TABLE "activityevents" ADD CONSTRAINT "activityevents_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("trip_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lodgingevents" ADD CONSTRAINT "lodgingevents_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("trip_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "travelevents" ADD CONSTRAINT "travelevents_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("trip_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

