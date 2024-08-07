-- DropForeignKey
ALTER TABLE "activityevents" DROP CONSTRAINT "activityevents_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "lodgingevents" DROP CONSTRAINT "lodgingevents_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "travelevents" DROP CONSTRAINT "travelevents_trip_id_fkey";

-- AddForeignKey
ALTER TABLE "activityevents" ADD CONSTRAINT "activityevents_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("trip_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lodgingevents" ADD CONSTRAINT "lodgingevents_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("trip_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "travelevents" ADD CONSTRAINT "travelevents_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("trip_id") ON DELETE CASCADE ON UPDATE NO ACTION;
