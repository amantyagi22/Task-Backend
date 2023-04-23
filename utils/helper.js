exports.getRequestPipeline = [
  [
    {
      $match: {
        $or: [
          {
            car: "BMW",
          },
          {
            car: "Mercedes",
          },
        ],
        income: {
          $lt: "$5",
        },
      },
    },
  ],
  [
    {
      $match: {
        gender: "Male",
        $expr: {
          $gt: [{ $toInt: "$phone_price" }, 10000],
        },
      },
    },
  ],
  [
    {
      $match: {
        last_name: new RegExp("^M"),
        $expr: {
          $gt: [
            {
              $strLenCP: "$quote",
            },
            15,
          ],
        },
        email: {
          $regex: ".*[last_name].*",
        },
      },
    },
  ],
  [
    {
      $match: {
        car: {
          $in: ["BMW", "Mercedes", "Audi"],
        },
        email: {
          $not: {
            $regex: new RegExp("d"),
          },
        },
      },
    },
  ],
  [
    {
      $group: {
        _id: "$city",
        user_count: {
          $sum: 1,
        },
        avg_income: {
          $avg: {
            $toDouble: {
              $substr: [
                "$income",
                1,
                {
                  $strLenCP: "$income",
                },
              ],
            },
          },
        },
      },
    },
    {
      $sort: {
        user_count: -1,
        avg_income: -1,
      },
    },
    {
      $limit: 10,
    },
  ],
  [],
];
